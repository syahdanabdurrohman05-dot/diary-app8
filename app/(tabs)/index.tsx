import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import DiaryCard from "../../src/components/DiaryCard";
import { toggleFavorite } from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

const MOOD_FILTERS = ["Semua", "😊", "🎯", "😌", "🥳"];

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedMood, setSelectedMood] = useState("Semua");

  const entries = useAppSelector((state) => state.diary.entries);
  const totalDiary = entries.length;
  const totalFavorite = entries.filter((item) => item.liked).length;

  const filteredEntries =
    selectedMood === "Semua"
      ? entries
      : entries.filter((item) => item.mood === selectedMood);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalDiary}</Text>
          <Text style={styles.statLabel}>Total Diary</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalFavorite}</Text>
          <Text style={styles.statLabel}>Total Favorite</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        {MOOD_FILTERS.map((mood) => (
          <Pressable
            key={mood}
            onPress={() => setSelectedMood(mood)}
            style={[
              styles.filterChip,
              selectedMood === mood && styles.filterChipActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedMood === mood && styles.filterTextActive,
              ]}
            >
              {mood}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={item.liked}
            onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
            onPress={() =>
              router.push({
                pathname: "/detail/[id]",
                params: { id: String(item.id) },
              })
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>📔</Text>
            <Text style={styles.emptyTitle}>Belum ada catatan diary</Text>
            <Text style={styles.emptySubtitle}>
              {selectedMood === "Semua"
                ? "Buka tab Tambah untuk mulai menulis diary pertamamu."
                : `Tidak ada diary dengan mood ${selectedMood}.`}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    paddingTop: 48,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.m,
  },
  statsRow: {
    flexDirection: "row",
    gap: SPACE.m,
    marginBottom: SPACE.m,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: SPACE.m,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.accent,
  },
  statLabel: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginTop: 2,
  },
  filterRow: {
    flexDirection: "row",
    gap: SPACE.s,
    marginBottom: SPACE.m,
    flexWrap: "wrap",
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  filterChipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  filterText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  emptyBox: {
    alignItems: "center",
    marginTop: 48,
    paddingHorizontal: SPACE.l,
  },
  emptyIcon: {
    fontSize: 42,
    marginBottom: SPACE.s,
  },
  emptyTitle: {
    fontSize: TYPO.title,
    fontWeight: "700",
    color: COLORS.text,
  },
  emptySubtitle: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 4,
  },
}); 