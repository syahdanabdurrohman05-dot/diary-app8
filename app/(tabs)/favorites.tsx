import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import {
  clearAllFavorites,
  toggleFavorite,
} from "../../src/features/diary/diarySlice";
import DiaryCard from "../../src/components/DiaryCard";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

export default function FavoritesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const favoriteEntries = useAppSelector((state) =>
    state.diary.entries.filter((entry) => entry.liked)
  );

  const handleClearAll = () => {
    Alert.alert(
      "Hapus Semua Favorite",
      "Semua tanda favorite pada diary akan dibersihkan.",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Bersihkan",
          style: "destructive",
          onPress: () => dispatch(clearAllFavorites()),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.header}>Favorite</Text>
          <Text style={styles.counter}>
            {favoriteEntries.length} diary favorite
          </Text>
        </View>

        {favoriteEntries.length > 0 && (
          <Pressable onPress={handleClearAll} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Hapus Semua</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={favoriteEntries}
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
            <Text style={styles.emptyIcon}>🤍</Text>
            <Text style={styles.emptyTitle}>Belum ada diary favorite</Text>
            <Text style={styles.emptySubtitle}>
              Tekan ikon hati pada halaman Home untuk menyimpan diary favoritmu di sini.
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACE.m,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
  },
  counter: {
    color: COLORS.muted,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.danger,
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontSize: TYPO.caption,
    fontWeight: "700",
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